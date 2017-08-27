import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, Image } from 'react-native';
import { graphql } from 'react-apollo';
import WebsiteDetailsQuery from 'queries/websiteDetails.gql';
import distance from 'date-fns/distance_in_words_strict';
import isThisWeek from 'date-fns/is_this_week';
import format from 'date-fns/format';
import { COLOR_GREEN, COLOR_RED } from 'theme';
import Error from 'components/error';

const queryOptions = {
  name: 'data',
  options: ({ item }) => ({
    variables: {
      id: item.id,
    },
  }),
};

function datize(date) {
  return isThisWeek(date)
    ? distance(Date.now(), date, { addSuffix: true })
    : format(date, 'DD MMMM');
}

@graphql(WebsiteDetailsQuery, queryOptions)
export default class WebsiteUptimesDetailScreen extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired, // eslint-disable-line
    data: PropTypes.shape({
      websiteDetails: PropTypes.shape({
        id: PropTypes.string,
        testType: PropTypes.string,
        paused: PropTypes.bool,
        contactGroups: PropTypes.array,
        status: PropTypes.string,
        uptime: PropTypes.number,
        checkRate: PropTypes.number,
        timeout: PropTypes.number,
        logoImage: PropTypes.string,
        lastTested: PropTypes.string,
        processing: PropTypes.bool,
        processingState: PropTypes.string,
        downTimes: PropTypes.string,
      }),
      loading: PropTypes.bool,
      error: PropTypes.object,
    }).isRequired,
  }

  labelValue = (label, data) => (
    <View style={styles.detail__row}>
      <Text style={styles.details__label}>{label.toUpperCase()}</Text>
      <Text style={styles.details__info}>{data.toString()}</Text>
    </View>
  )

  render() {
    const { item, data } = this.props;
    const { websiteDetails, loading, error } = data;

    if (loading) {
      return null;
    }

    if (error) {
      return <Error />;
    }

    const {
      id,
      testType,
      paused,
      contactGroups,
      status,
      uptime,
      checkRate,
      timeout,
      logoImage,
      lastTested,
      processing,
      processingState,
      downTimes,
    } = websiteDetails;

    const isUp = status === 'Up';

    return (
      <ScrollView style={styles.details}>
        <View style={styles.details__head}>
          <View style={styles.details__headImage}>
            {logoImage ? (
              <Image
                style={styles.details__avatar}
                source={{ uri: logoImage }}
              />
            ) : (
              <Image
                style={[styles.details__avatar, styles.details__avatarPlaceholder]}
                source={require('../../assets/images/folder.png')}
              />
            )}
          </View>

          <View style={styles.details__headInfo}>
            <Text style={styles.details__email}>{item.name}</Text>

            <Text
              style={[
                styles.details__info,
                styles.details__bold,
                isUp ? styles.details__itemSubUp : styles.details__itemSubDown,
              ]}
            >
              {status} - Uptime: {uptime}%
            </Text>

            <Text style={styles.details__info}>Last tested: {datize(lastTested)}</Text>
          </View>
        </View>

        {contactGroups.length > 0 && (
          <View>
            <Text style={styles.details__title}>Contact details</Text>

            {contactGroups.map((c, i) => (
              <View
                key={`contact-group-${i}`} // eslint-disable-line
              >
                {this.labelValue('name', c.name)}
                {this.labelValue('Contact emails', c.email)}
              </View>
            ))}
          </View>
        )}

        <Text style={styles.details__title}>Status</Text>

        {this.labelValue('id', id)}
        {this.labelValue('testType', testType)}
        {this.labelValue('paused', paused)}
        {this.labelValue('processing', processing)}
        {this.labelValue('processingState', processingState)}
        {this.labelValue('downTimes', downTimes)}
        {this.labelValue('checkRate', `${checkRate}s`)}
        {this.labelValue('timeout', `${timeout}s`)}
      </ScrollView>
    );
  }
}

const styles = {
  details: {
    flex: 1,

    padding: 10,

    backgroundColor: '#FFFFFF',
  },

  details__head: {
    flexDirection: 'row',

    paddingTop: 10,
    paddingBottom: 10,
  },

  details__headImage: {
    paddingRight: 20,
  },

  details__avatar: {
    width: 100,
    height: 100,

    borderRadius: 50,
  },

  details__avatarPlaceholder: {
    backgroundColor: '#ccc',
  },

  details__headInfo: {
    justifyContent: 'center',
  },

  details__email: {
    paddingBottom: 5,

    fontWeight: '700',
    fontSize: 18,
  },

  details__bold: {
    fontWeight: '500',
  },

  details__itemSubUp: {
    color: COLOR_GREEN,
  },

  details__itemSubDown: {
    color: COLOR_RED,
  },

  details__title: {
    marginVertical: 20,

    color: '#000000',
    fontFamily: 'HelveticaNeue',
    fontWeight: '500',
    fontSize: 18,
  },

  detail__row: {
    marginBottom: 10,
  },

  details__label: {
    marginBottom: 5,

    color: '#AAAEB3',
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 13,
  },

  details__info: {
    marginBottom: 5,

    color: '#000000',
    fontFamily: 'HelveticaNeue',
    fontSize: 16,
  },
};
