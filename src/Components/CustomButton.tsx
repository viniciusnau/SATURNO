import React from 'react';
import Button from '@mui/material/Button';

function CustomButton() {
  return (
    <div>
        <Button
        variant="contained"
        color="success"
        size="medium"
        disabled={false}
        onClick={() => {}}
        >
        Submit
        </Button>
    </div>
  );
}

export default CustomButton;
