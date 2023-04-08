import fs from 'fs';
import removeAccents from './removeAccents.js';
const rawData = JSON.parse(fs.readFileSync('raw-data.json'));

const getName = (name, count = 1) => name.split(' ').slice(count).join(' ');

const getType = (type, count = 1) =>
  type.split(' ').slice(0, count).join(' ').charAt(0).toUpperCase() +
  type.split(' ').slice(0, count).join(' ').slice(1);

const getKey = (name, count = 1) =>
  name
    .split('_')
    .slice(count)
    .map((item) => item[0])
    .join('');

const formatData = rawData.map((province) => {
  let name, type, key;
  if (province.codename.includes('thanh_pho')) {
    name = getName(province.name, 2);
    type = getType(province.division_type, 2);
    key = getKey(province.codename, 2);
  } else {
    name = getName(province.name);
    type = getType(province.division_type);
    key = getKey(province.codename);
  }

  return {
    code: province.code,
    name,
    type,
    lower: removeAccents(name).toLowerCase(),
    key,
    districts: province.districts.map((district) => {
      let name, type, key;
      if (
        district.codename.includes('thanh_pho') ||
        district.codename.includes('thi_xa')
      ) {
        name = getName(district.name, 2);
        type = getType(district.division_type, 2);
        key = getKey(district.codename, 2);
      } else {
        name = getName(district.name);
        type = getType(district.division_type);
        key = getKey(district.codename);
      }

      return {
        code: district.code,
        name,
        type,
        lower: removeAccents(name).toLowerCase(),
        key,
        wards: district.wards.map((ward) => {
          let name, type, key;
          if (ward.codename.includes('thi_tran')) {
            name = getName(ward.name, 2);
            type = getType(ward.division_type, 2);
            key = getKey(ward.codename, 2);
          } else {
            name = getName(ward.name);
            type = getType(ward.division_type);
            key = getKey(ward.codename);
          }

          return {
            code: ward.code,
            name,
            type,
            lower: removeAccents(name).toLowerCase(),
            key,
          };
        }),
      };
    }),
  };
});

fs.writeFile('data.json', JSON.stringify(formatData), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
