import fs from 'fs';
import removeAccents from './removeAccents.js';
const rawData = JSON.parse(fs.readFileSync('raw-data.json'));

// console.log(rawData.length);
// console.log(removeAccents(rawData[0].name));

// console.log('thanh_pho_ha_noi'.replace(/_/g, ' '));
// console.log('Thành phố Hà Nội'.toLowerCase());

const formatData = rawData.map((province) => ({
  code: province.code,
  name: province.name,
  division_type: province.division_type,
  lower: removeAccents(province.name).toLowerCase(),
  key: province.codename.replace(/_/g, ' ').includes('thanh pho')
    ? province.codename
        .split('_')
        .map((item) => item[0])
        .join('')
        .substring(2)
    : province.codename
        .split('_')
        .map((item) => item[0])
        .join('')
        .substring(1),
  districts: province.districts.map((district) => ({
    code: district.code,
    name: district.name,
    division_type: district.division_type,
    lower: removeAccents(district.name).toLowerCase(),
    key:
      district.codename.replace(/_/g, ' ').includes('thanh pho') ||
      district.codename.replace(/_/g, ' ').includes('thi xa')
        ? district.codename
            .split('_')
            .map((item) => item[0])
            .join('')
            .substring(2)
        : district.codename
            .split('_')
            .map((item) => item[0])
            .join('')
            .substring(1),
    wards: district.wards.map((ward) => ({
      code: ward.code,
      name: ward.name,
      division_type: ward.division_type,
      lower: removeAccents(ward.name).toLowerCase(),
      key: ward.codename.replace(/_/g, ' ').includes('thi tran')
        ? ward.codename
            .split('_')
            .map((item) => item[0])
            .join('')
            .substring(2)
        : ward.codename
            .split('_')
            .map((item) => item[0])
            .join('')
            .substring(1),
    })),
  })),
}));

fs.writeFile('data.json', JSON.stringify(formatData), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
