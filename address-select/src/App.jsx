import { Container, Divider, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { FindAddress, SelectAddress } from './components';
import { CustomBox } from './components/styled';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('src/assets/data.json')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ minWidth: '1200px', minHeight: '100vh' }}>
      <Stack minHeight="100vh">
        <CustomBox>
          <SelectAddress data={data} />
        </CustomBox>
        <Divider />
        <CustomBox>
          <FindAddress />
        </CustomBox>
      </Stack>
    </Container>
  );
};

export default App;
