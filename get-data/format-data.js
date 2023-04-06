import fs from 'fs';
const rawData = JSON.parse(fs.readFileSync('raw-data.json'));

// console.log(rawData.length);
// console.log(removeAccents(rawData[0].name));

// console.log('thanh_pho_ha_noi'.replace(/_/g, ' '));
// console.log('Thành phố Hà Nội'.toLowerCase());

const formatData = rawData.map((province) => ({
  code: province.code,
  name: province.name,
  division_type: province.division_type,
  lower: province.codename.replace(/_/g, ' '),
  key: province.codename
    .split('_')
    .map((item) => item[0])
    .join(''),
  districts: province.districts.map((district) => ({
    code: district.code,
    name: district.name,
    division_type: district.division_type,
    lower: district.codename.replace(/_/g, ' '),
    key: district.codename
      .split('_')
      .map((item) => item[0])
      .join(''),
    wards: district.wards.map((ward) => ({
      code: ward.code,
      name: ward.name,
      division_type: ward.division_type,
      lower: ward.codename.replace(/_/g, ' '),
      key: ward.codename
        .split('_')
        .map((item) => item[0])
        .join(''),
    })),
  })),
}));

fs.writeFile('data.json', JSON.stringify(formatData), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
