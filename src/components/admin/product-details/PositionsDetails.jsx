import { Stack, TextField, Chip } from "@mui/material";
import { useState } from "react";

const PositionsDetails = ({ input }) => {
  const [chipData, setChipData] = useState(input?.value?.positions || []);

  const handleAddChip = (chip) => {
    if (chip && !chipData.includes(chip)) {
      const newChipData = [...chipData, chip];
      setChipData(newChipData);
      // Update form field value with new array
      input.onChange(newChipData);
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    const newChipData = chipData.filter((chip) => chip !== chipToDelete);
    setChipData(newChipData);
    // Update form field value with updated array
    input.onChange(newChipData);
  };

  return (
    <Stack gap="15px">
      {/* Display chips */}
      <Stack direction="row" alignItems="center" gap="10px">
        {chipData.map((data, index) => (
          <Chip
            key={index}
            label={data}
            onDelete={() => handleDeleteChip(data)}
            sx={{ marginRight: "5px" }}
          />
        ))}
      </Stack>

      {/* TextField to add position */}
      <TextField
        label="Add Position"
        variant="outlined"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            handleAddChip(event.target.value);
            event.target.value = ""; // Clear input field
          }
        }}
      />
    </Stack>
  );
};

export default PositionsDetails;
