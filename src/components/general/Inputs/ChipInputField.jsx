import { useState } from "react";
import { TextField, Chip, Stack } from "@mui/material";

const ChipInputField = ({ input, label, meta: { touched, error }, ...custom }) => {
  const [chipData, setChipData] = useState([]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      event.preventDefault();
      setChipData((chips) => [
        ...chips,
        { key: chips.length + 1, label: event.target.value },
      ]);
      event.target.value = "";
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        label={label}
        onKeyDown={handleKeyDown}
        error={touched && !!error}
        helperText={touched && error}
        {...input}
        {...custom}
      />
      <Stack direction="row" spacing={1}>
        {chipData.map((chip) => (
          <Chip
            key={chip.key}
            label={chip.label}
            onDelete={handleDelete(chip)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default ChipInputField;
