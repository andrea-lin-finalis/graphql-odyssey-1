import React from 'react';
import { gql, useQuery } from '@apollo/client';

import TrackDetail from '../components/track-detail';
import { Layout, QueryResult } from '../components';

// GET_TRACK gql query to retrieve a specific track by its ID
export const GET_TRACK = gql`
  query GetTrack($trackId: ID!) {
    track(id: $trackId) {
      id
      title
      author {
        id
        name
        photo
      }
      thumbnail
      length
      modulesCount
      description
      numberOfViews
      modules {
        id
        title
        length
      }
    }
  }
`;

// Track page fetches a track's data from the gql query GET_TRACK and provides it to the TrackDetail component to display
const Track = ({ trackId }) => {
  const { error, loading, data } = useQuery(GET_TRACK, {
    variables: { trackId },
  });
  return (
    <Layout>
      <QueryResult error={error} loading={loading} data={data}>
        {/* this is where our componenet displaying the track data will go */}
        <TrackDetail track={data?.track} />
      </QueryResult>
    </Layout>
  );
};

export default Track;
