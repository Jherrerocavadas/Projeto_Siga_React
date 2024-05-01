import React from 'react';
import { useAuth } from '../contexts/auth';

import SignedRoutes from './SignedRoutes';
import PublicRoutes from './PublicRoutes';

function Routes(){
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <SignedRoutes /> : <PublicRoutes/>;
};

export default Routes;