import { Box, Button, Typography, styled } from '@mui/material';

export const CustomBox = styled(Box)({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
});

export const Title = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: 32,
});

export const SubmitButton = styled(Button)({
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: 16,
});
