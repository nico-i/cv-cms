import { createDatabase } from '@tinacms/datalayer';
import { MongodbLevel } from 'mongodb-level';
import { GitHubProvider } from 'tinacms-gitprovider-github';

const branch = process.env.GITHUB_BRANCH;
if (!branch) {
  throw new Error(`GITHUB_BRANCH is required`);
}

const owner = process.env.GITHUB_OWNER;
if (!owner) {
  throw new Error(`GITHUB_OWNER is required`);
}

const repo = process.env.GITHUB_REPO;
if (!repo) {
  throw new Error(`GITHUB_REPO is required`);
}

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
if (!token) {
  throw new Error(`GITHUB_PERSONAL_ACCESS_TOKEN is required`);
}

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error(`MONGODB_URI is required`);
}

export default createDatabase({
  gitProvider: new GitHubProvider({
    owner,
    repo,
    token,
    branch,
  }),
  databaseAdapter: new MongodbLevel<string, Record<string, unknown>>({
    collectionName: branch,
    dbName: `tinacms`,
    mongoUri: mongoUri,
  }),
});
