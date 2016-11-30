import CacheRequest from './src/cache';
import DeltaFetchRequest from 'kinvey-node-sdk/dist/request/src/deltafetch';
import Headers from 'kinvey-node-sdk/dist/request/src/headers';
import NetworkRequest, { AuthType, KinveyRequest, Properties } from 'kinvey-node-sdk/dist/request/src/network';
import Request, { RequestMethod } from 'kinvey-node-sdk/dist/request/src/request';
import Response, { KinveyResponse, StatusCode } from 'kinvey-node-sdk/dist/request/src/response';

// Export
export {
  AuthType,
  CacheRequest,
  CacheRequest as LocalRequest,
  DeltaFetchRequest,
  Headers,
  KinveyRequest,
  KinveyResponse,
  NetworkRequest,
  Properties,
  RequestMethod,
  Response,
  StatusCode
};

// Export default
export default Request;
