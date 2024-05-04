import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthContext } from './AuthContext';
import PredictionComponent from './PredictionComponent';
import axios from 'axios';

// Mock the axios post call
jest.mock('axios', () => ({
  post: jest.fn(),
}));

// This function will replace the default render function
const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <Router>
      <AuthContext.Provider value={providerProps}>{ui}</AuthContext.Provider>
    </Router>,
    renderOptions
  );
};

describe('PredictionComponent', () => {
  it('renders without crashing and shows loading state', async () => {
    // Mock the context value expected in the component
    const providerProps = {
      currentUser: {
        uid: '123', 
        
      },
      setCurrentUser: jest.fn(), 
    };

    // Mock the axios post response
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { result: 'Healthy' }, // Mock the prediction result
    });

    // Use the customRender function with the mocked providerProps
    const { findByText } = customRender(<PredictionComponent />, { providerProps });

   
    const predictButton = await findByText('Predict');
    expect(predictButton).toBeInTheDocument();
  });

 
});
