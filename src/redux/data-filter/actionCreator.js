import actions from './actions';
// import initialState from '../../demoData/data-table.json';
// import initialState from '../../demoData/test.json';

let initialState = [];


const {
  dataTableReadBegin,
  dataTableReadSuccess,
  dataTableReadErr,
  filterWithSubmitBegin,
  filterWithSubmitSuccess,
  filterWithSubmitErr,
  dataLiveFilterBegin,
  dataLiveFilterSuccess,
  dataLiveFilterErr,
} = actions;

const tableReadData = (data) => {
  return async (dispatch) => {
    try {
      initialState = data;
      // console.log("initialState : ", initialState)
      dispatch(dataTableReadBegin());
      dispatch(dataTableReadSuccess(initialState));
    } catch (err) {
      dispatch(dataTableReadErr(err));
    }
  };
};

const filterWithSubmit = (id, status) => {
  return async (dispatch) => {
    try {
      dispatch(filterWithSubmitBegin());
      setTimeout(() => {
        const data = initialState.filter((item) => {
          return item.id.indexOf(id) >= 0 && item.status.toLowerCase().indexOf(status.toLowerCase()) >= 0;
        });
        dispatch(filterWithSubmitSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(filterWithSubmitErr(err));
    }
  };
};

const dataLiveFilter = (value, key) => {
  console.log(key, value)
  return async (dispatch) => {
    try {
      dispatch(dataLiveFilterBegin());
      let data = []
      if (Array.isArray(value)) {
        let latest = []
        for (const val of value) {
          latest = initialState.filter((item) => {
            return item[key].toLowerCase().startsWith(val.toLowerCase());
          })
          
          data = [...new Set([...data, ...latest])];
        }

        console.log("1 ", data);
      }
      else {
        data = initialState.filter((item) => {
          return item[key].toLowerCase().startsWith(value.toLowerCase());
        });
  
      }
      dispatch(dataLiveFilterSuccess(data));

    } catch (err) {
      dispatch(dataLiveFilterErr(err));
    }
  };
};

// const ticketUpdateData = data => {
//   return async dispatch => {
//     try {
//       dispatch(ticketReadBegin());
//       dispatch(ticketReadSuccess(data));
//     } catch (err) {
//       dispatch(ticketReadErr(err));
//     }
//   };
// };

// const ticketUpdateSearch = (value, key) => {
//   return async dispatch => {
//     try {
//       dispatch(ticketReadBegin());
//       const data = initialState.filter(item => item[key].startsWith(value));
//       dispatch(ticketReadSuccess(data));
//     } catch (err) {
//       dispatch(ticketReadErr(err));
//     }
//   };
// };

// const singlePageReade = id => {
//   return async dispatch => {
//     try {
//       dispatch(filterSinglePageReadBegin());
//       const data = initialState.filter(item => parseInt(item.id) === parseInt(id));

//       dispatch(filterSinglePageReadSuccess(data));
//     } catch (err) {
//       dispatch(filterSinglePageReadErr(err));
//     }
//   };
// };

export { filterWithSubmit, tableReadData, dataLiveFilter };
