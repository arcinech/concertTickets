import { Alert, Progress, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  getConcerts,
  getRequest,
  loadConcertsRequest,
} from '../../../redux/concertsRedux';
import { useEffect } from 'react';

const Prices = () => {
  const dispatch = useDispatch();
  const concerts = useSelector(getConcerts);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadConcertsRequest());
  }, [dispatch]);

  const numberToDays = number => {
    const days = ['Day one', 'Day two', 'Day three', 'Day four', 'Day five'];
    return days[number - 1];
  };

  if (request.pending) return <Progress animated color='primary' value={50} />;
  else if (request.error) return <Alert color='warning'>{request.error}</Alert>;
  else if (!request.success || !concerts.length)
    return <Alert color='info'>No price list</Alert>;
  else if (request.success)
    return (
      <Container>
        <h1>Prices</h1>
        <p>
          Prices may differ according the day of the festival. Remember that ticket
          includes not only the star performance, but also 10+ workshops. We gathered
          several genre teachers to help you increase your vocal skills, as well as self
          confidence.
        </p>

        <Alert color='info'>
          Attention!{' '}
          <strong>
            Children under 4 can go freely with you without any other fee!
          </strong>
        </Alert>

        {concerts.map(({ day, price, workshops }, index) => (
          <div key={index}>
            {console.log(workshops)}
            <h2>{numberToDays(day)}</h2>
            <p>Price: ${price}</p>
            <p>Workshops: {workshops.map(({ name }) => `"${name}"`).join(', ')}</p>
          </div>
        ))}
      </Container>
    );
};

export default Prices;
