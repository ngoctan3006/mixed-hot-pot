import { Search } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Title } from './styled';

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
            temp.push(`${ward.name}, ${district.name}, ${province.name}`);
          }
        });
      });
    });

    setResult(temp);
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

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
        />
        {result.length > 0 && (
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
        )}
      </Stack>
    </Box>
  );
};

export default FindAddress;
