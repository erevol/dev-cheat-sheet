import Job from '../components/Job';

const JobPage = (props) => (
  <Job id={props.query.id} />
);

export default JobPage;
