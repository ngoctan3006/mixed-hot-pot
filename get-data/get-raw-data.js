import axios from 'axios';
import fs from 'fs';

axios
  .get('https://provinces.open-api.vn/api/?depth=3')
  .then((res) => {
    fs.writeFile('raw-data.json', JSON.stringify(res.data), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
  .catch((err) => {
    console.log(err);
  });
