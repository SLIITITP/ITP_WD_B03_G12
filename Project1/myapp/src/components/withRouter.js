import { useLocation, useNavigate } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();


    return (
      <Component
        navigate={navigate}
        location={location}
        
        {...props}
        />
    );
  };
  
  return Wrapper;
};