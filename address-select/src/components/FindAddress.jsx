import { RotateLeft, Search } from '@mui/icons-material';
import {
  Alert,
  Box,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { SubmitButton, Title } from './styled';

const FindAddress = ({ data }) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const handleSearch = () => {
    setLoading(true);
    const temp = [];
    const searchValue = search.trim().toLowerCase();
    if (!searchValue) {
      setResult([]);
      setLoading(false);
      return;
    }

    data.forEach((province) => {
      if (
        province.name.toLowerCase().includes(search.toLowerCase()) ||
        province.lower.includes(searchValue) ||
        province.key.includes(searchValue)
      ) {
        temp.push(province.name);
      }
      province.districts.forEach((district) => {
        if (
          district.name.toLowerCase().includes(search.toLowerCase()) ||
          district.lower.includes(searchValue) ||
          district.key.includes(searchValue)
        ) {
          temp.push(`${district.name}, ${province.name}`);
        }
        district.wards.forEach((ward) => {
          if (
            ward.name.toLowerCase().includes(search.toLowerCase()) ||
            ward.lower.includes(searchValue) ||
            ward.key.includes(searchValue)
          ) {
            temp.push(
              `${ward.type} ${ward.name}, ${district.type} ${district.name}, ${province.type} ${province.name}`,
            );
          }
        });
      });
    });

    if (temp.length === 0) setResult('Không tìm thấy kết quả nào');
    else setResult(temp);
    setLoading(false);
  };

  const handleReset = () => {
    setSearch('');
    setResult([]);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Title variant="h4">Tìm kiếm địa chỉ</Title>
      <Stack>
        <TextField
          placeholder="Bạn cần tìm gì..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {loading ? (
                  <CircularProgress size="2rem" color="primary" />
                ) : (
                  <Search />
                )}
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <Box sx={{ mt: 3, display: 'flex' }}>
          <SubmitButton
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSearch}
            startIcon={<Search />}
            disabled={search.trim().length === 0}
            sx={{
              ml: 'auto',
              '&:disabled': {
                cursor: 'not-allowed',
                pointerEvents: 'all !important',
              },
            }}
          >
            Tìm kiếm
          </SubmitButton>
          <SubmitButton
            variant="contained"
            color="primary"
            size="large"
            onClick={handleReset}
            sx={{ mr: 'auto', ml: 3 }}
            startIcon={<RotateLeft />}
          >
            Reset
          </SubmitButton>
        </Box>
        {typeof result === 'string' ? (
          <Alert severity="error" sx={{ mt: 4, fontWeight: 'bold' }}>
            {result}
          </Alert>
        ) : (
          result.length > 0 && (
            <Stack mt={4} direction="row">
              <Title
                sx={{ mb: 0, mr: 1, fontSize: 16, fontWeight: 700 }}
                variant="h6"
              >
                Kết quả tìm kiếm:
              </Title>
              <Stack>
                {result.map((item, index) => (
                  <Typography key={index} variant="body1">
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          )
        )}
      </Stack>
    </Box>
  );
};

export default FindAddress;
