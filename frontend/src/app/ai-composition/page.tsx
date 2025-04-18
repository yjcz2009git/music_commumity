'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper, SelectChangeEvent } from '@mui/material';

export default function AIComposition() {
  const [formData, setFormData] = useState({
    title: '',
    style: '',
    tempo: 120,
    duration: 180,
    instruments: []
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement AI composition generation
    console.log('Generating music with:', formData);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        AI 作曲
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="音乐标题"
            name="title"
            value={formData.title}
            onChange={handleTextChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>音乐风格</InputLabel>
            <Select
              name="style"
              value={formData.style}
              onChange={handleSelectChange}
              label="音乐风格"
            >
              <MenuItem value="pop">流行</MenuItem>
              <MenuItem value="rock">摇滚</MenuItem>
              <MenuItem value="classical">古典</MenuItem>
              <MenuItem value="jazz">爵士</MenuItem>
              <MenuItem value="electronic">电子</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="number"
            label="速度 (BPM)"
            name="tempo"
            value={formData.tempo}
            onChange={handleTextChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="时长 (秒)"
            name="duration"
            value={formData.duration}
            onChange={handleTextChange}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            生成音乐
          </Button>
        </form>
      </Paper>
    </Box>
  );
} 