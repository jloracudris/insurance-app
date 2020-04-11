const plateState = {
    plate: '',
    brand: 'Nissan Versa',
    amount: '$50.000.000',
    insuranceAmount: '$350.000',
    image: 'https://static.carroya.com/vehiculos/1909653/1909653_1_w.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    paymentMethod: null,
  };
  
  export const plateReducer = (state = plateState, action) => {            
    switch (action.type) {
      case 'ADD_USERPLATE': {        
        state = { 
          ...state,
          ...action.vehicleInfo
        }
        break;
      }
      case 'ADD_USERPHONE': {
        state = {
          ...state,
          phone: action.phone
        }
      }
      case 'ADD_USEREMAIL': {
        state = {
          ...state,
          email: action.email
        }
      }
      default:
        return state;
    }
    return state;
  };
  