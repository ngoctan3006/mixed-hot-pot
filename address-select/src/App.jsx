import { Box, Container, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FindAddress, SelectAddress } from './components';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

const App = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch('src/assets/data.json')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ minWidth: '1200px', minHeight: '100vh' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 5 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            },
          }}
        >
          <Tab label="Chọn địa chỉ" {...a11yProps(0)} />
          <Tab label="Tìm kiếm địa chỉ" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SelectAddress data={data} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FindAddress data={data} />
      </TabPanel>
    </Container>
  );
};

export default App;
