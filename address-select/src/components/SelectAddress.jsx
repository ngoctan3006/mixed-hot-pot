import { Box, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SelectInput from './SelectInput';
import { SubmitButton, Title } from './styled';

const SelectAddress = () => {
  const [data, setData] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [street, setStreet] = useState('');
  const [result, setResult] = useState('');
  const [formError, setFormError] = useState({});

  const handleProvinceChange = (e) => {
    setResult('');
    setFormError({});
    setSelectedProvince(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setResult('');
    setFormError({});
    setSelectedDistrict(e.target.value);
  };

  const handleWardChange = (e) => {
    setResult('');
    setFormError({});
    setSelectedWard(e.target.value);
  };

  const handleStreetChange = (e) => {
    setResult('');
    setFormError({});
    setStreet(e.target.value);
  };

  const handleSubmit = () => {
    const error = {};
    if (!selectedProvince) error.province = 'Bạn chưa chọn tỉnh/thành phố';
    if (!selectedDistrict) error.district = 'Bạn chưa chọn quận/huyện';
    if (!selectedWard) error.ward = 'Bạn chưa chọn phường/xã';
    if (Object.keys(error).length > 0) {
      setFormError(error);
      return;
    }

    const province = provinceList.find(
      (item) => item.code === selectedProvince,
    );
    const district = districtList.find(
      (item) => item.code === selectedDistrict,
    );
    const ward = wardList.find((item) => item.code === selectedWard);
    setResult(
      `${street ? street + ', ' : ''}${ward.name}, ${district.name}, ${
        province.name
      }`,
    );
  };

  useEffect(() => {
    fetch('src/assets/data.json')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const provinces = data.map((item) => ({
      code: item.code,
      name: item.name,
      division_type: item.division_type,
      lower: item.lower,
      key: item.key,
    }));
    setProvinceList(provinces);
  }, [data]);

  useEffect(() => {
    setSelectedDistrict('');
    const districts = data.find((item) => item.code === selectedProvince);
    if (districts) {
      const districtList = districts.districts.map((item) => ({
        code: item.code,
        name: item.name,
        division_type: item.division_type,
        lower: item.lower,
        key: item.key,
      }));
      setDistrictList(districtList);
    }
  }, [selectedProvince]);

  useEffect(() => {
    setSelectedWard('');
    const districts = data.find((item) => item.code === selectedProvince);
    if (districts) {
      const wards = districts.districts.find(
        (item) => item.code === selectedDistrict,
      );
      if (wards) {
        setWardList(
          wards.wards.map((item) => ({
            code: item.code,
            name: item.name,
            division_type: item.division_type,
            lower: item.lower,
            key: item.key,
          })),
        );
      }
    }
  }, [selectedDistrict]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Title variant="h4">Chọn địa chỉ</Title>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SelectInput
            label="Tỉnh/Thành phố"
            selected={selectedProvince}
            data={provinceList}
            onChange={handleProvinceChange}
            disabled={provinceList.length === 0}
            error={formError.province}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <SelectInput
            label="Quận/Huyện"
            selected={selectedDistrict}
            data={districtList}
            onChange={handleDistrictChange}
            disabled={!selectedProvince}
            error={formError.district}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <SelectInput
            label="Xã/Phường"
            selected={selectedWard}
            data={wardList}
            onChange={handleWardChange}
            disabled={!selectedDistrict}
            error={formError.ward}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Địa chỉ cụ thể"
            onChange={handleStreetChange}
            value={street}
            fullWidth
            disabled={!selectedWard}
          />
        </Grid>

        <Grid
          item
          xs={3}
          sx={{ mx: 'auto', display: 'flex', justifyContent: 'center', mt: 2 }}
        >
          <SubmitButton
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSubmit}
          >
            Xác nhận
          </SubmitButton>
        </Grid>

        {!!result && (
          <Grid
            item
            xs={12}
            sx={{ mt: 2, display: 'flex', alignItems: 'center' }}
          >
            <Title
              variant="h6"
              sx={{ mb: 0, mr: 1, fontSize: 16, fontWeight: 700 }}
            >
              Địa chỉ đã chọn:
            </Title>
            <Typography variant="body1">{result}</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SelectAddress;
