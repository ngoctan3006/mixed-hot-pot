import { Box, Container, Divider, Stack, styled } from '@mui/material';
import { FindAddress, SelectAddress } from './components';

const CustomBox = styled(Box)({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
});

const App = () => {
  return (
    <Container maxWidth="lg" sx={{ minWidth: '1200px', minHeight: '100vh' }}>
      <Stack minHeight="100vh">
        <CustomBox>
          <SelectAddress />
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
