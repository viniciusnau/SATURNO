import React from 'react';
import Button from '@mui/material/Button';

function MyComponent() {
  return (
    <div>
        <Button
        variant="contained"
        color="primary"
        size="medium"
        disabled={false}
        onClick={() => {}}
        >
        Submit
        </Button>
    </div>
  );
}

export default MyComponent;
