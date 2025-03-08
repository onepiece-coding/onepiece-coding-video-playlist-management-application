import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  updateComment,
  deleteComment,
} from "../store/slices/commentSlice";

const CommentSection = ({ videoId }) => {
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState("");
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments[videoId] || []);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment,
        author: "User",
        timestamp: new Date().toISOString(),
      };
      dispatch(addComment({ videoId, comment }));
      setNewComment("");
    }
  };

  const handleEdit = (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    setEditingComment(commentId);
    setNewComment(comment.text);
  };

  const handleUpdateComment = () => {
    if (newComment.trim()) {
      dispatch(
        updateComment({
          videoId,
          commentId: editingComment,
          newText: newComment,
        })
      );
      setEditingComment(null);
      setNewComment("");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 dark:text-white">
        Commentaires ({comments.length})
      </h3>

      <form onSubmit={handleAddComment} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="w-full p-2 rounded-lg border dark:text-white dark:bg-gray-700 dark:border-gray-600"
          rows={3}
        />
        <div className="mt-2 flex justify-end">
          {editingComment ? (
            <button
              type="button"
              onClick={handleUpdateComment}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Modifier
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Commenter
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-semibold dark:text-white">
                  {comment.author}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(comment.id)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Modifier
                </button>
                <button
                  onClick={() =>
                    dispatch(deleteComment({ videoId, commentId: comment.id }))
                  }
                  className="text-red-500 hover:text-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
            <p className="dark:text-gray-300">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
