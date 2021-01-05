import React, { useState } from 'react';

const TripContext = React.createContext();

export const TripProvider = TripContext.Provider;
export default TripContext;
