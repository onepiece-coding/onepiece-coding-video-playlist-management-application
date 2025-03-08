import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {},
  reducers: {
    addComment: (state, action) => {
      const { videoId, comment } = action.payload;
      if (!state[videoId]) {
        state[videoId] = [];
      }
      state[videoId].push(comment);
    },
    updateComment: (state, action) => {
      const { videoId, commentId, newText } = action.payload;
      const comments = state[videoId];
      const commentIndex = comments.findIndex((c) => c.id === commentId);
      if (commentIndex !== -1) {
        comments[commentIndex].text = newText;
      }
    },
    deleteComment: (state, action) => {
      const { videoId, commentId } = action.payload;
      state[videoId] = state[videoId].filter((c) => c.id !== commentId);
    },
  },
});

export const { addComment, updateComment, deleteComment } =
  commentSlice.actions;

export default commentSlice.reducer;
