import { useQuery, gql } from '@apollo/client';

import { Layout, QueryResult } from '../components';
import ModuleDetail from '../components/module-detail';

/**
 * GET_MODULE_AND_PARENT_TRACK gql query to retrieve a specific module and its parent track,
 * both needed for the ModuleDetail component
 */
const GET_MODULE_AND_PARENT_TRACK = gql`
  query getModuleAndParentTrack($trackId: ID!, $moduleId: ID!) {
    track(id: $trackId) {
      title
      modules {
        id
        length
        title
      }
    }
    module(id: $moduleId) {
      id
      content
      videoUrl
      title
    }
  }
`;

/**
 * Module page fetches both parent track and module's data from the gql query GET_MODULE_AND_PARENT_TRACK
 * and feeds them to the Module detail component
 */

const Module = ({ trackId, moduleId }) => {
  const { loading, error, data } = useQuery(GET_MODULE_AND_PARENT_TRACK, {
    variables: { trackId, moduleId },
  });

  return (
    <Layout fullWidth>
      <QueryResult loading={loading} error={error} data={data}>
        <ModuleDetail track={data.track} module={data.module} />
      </QueryResult>
    </Layout>
  );
};

export default Module;
