import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Rating,
  TextField,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "components/icons/DeleteIcon";

const CommentProducts = ({ list }) => {
  const [comments, setComments] = useState([
    {
      id: "0",
      userID: "1001",
      userName: "Мухаммадали",
      productRating: "4.5",
      comment:
        "товар получил только что просто супер качество на высшем уровне спасибо узум маркет за то что доставляет качественно товар оставайтесь всегда так 👍👍👍",
    },
    {
      id: "1",
      userID: "1002",
      userName: "Тимур",
      productRating: "5",
      comment:
        "Отлично выполняет заявленные функции, вообще удобная, лёгкая, волосы не тянет. Цена качество на уровне.",
    },
    {
      id: "2",
      userID: "1003",
      userName: "ALEKSANDR",
      productRating: "5",
      comment:
        "Добрый день. Тример получил. Протестировал. Работает хорошо. Покупкой очень доволен. Спасибо большое.",
    },
    {
      id: "3",
      userID: "1004",
      userName: "Rustamjon",
      productRating: "5",
      comment:
        "Assalomu aleykum, tovaringiz juda ajoyib yetib keldi ishlatib kurdik hammasi a'lo darajada , raxmat",
    },
    {
      id: "4",
      userID: "1005",
      userName: "ayub",
      productRating: "4",
      comment:
        "получил заказ на следующий день! очень быстро. товар вполне себе оправдывает спасибо!",
    },
    {
      id: "5",
      userID: "1006",
      userName: "Ahad",
      productRating: "5",
      comment:
        "O'z vaqtida yetib keldi. Ishlashi va sifati yaxshi. Ishlarizga omad.",
    },
    {
      id: "6",
      userID: "1007",
      userName: "",
      productRating: "5",
      comment: "gap yo'q bir kunda yetib keldi. Mahsulot yap yangi",
    },
    {
      id: "7",
      userID: "1008",
      userName: "Rasulbek",
      productRating: "5",
      comment: "hammasi joyida, super🤝👍",
    },
    {
      id: "8",
      userID: "1009",
      userName: "Siroj",
      productRating: "3.2",
      comment: "Ishlashi zo’r",
    },
    {
      id: "9",
      userID: "1010",
      userName: "Jasurbek",
      productRating: "5",
      comment: "",
    },
  ]);
  const [showReplyInput, setShowReplyInput] = useState({});
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const handleComment = (commentId, reply) => {
    setShowReplyInput((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
    if (!reply || reply.trim() === "") {
      return; // Ignore if the reply is empty or undefined
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      return comment;
    });

    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const handleDeleteReply = (commentId, replyIndex) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.filter(
          (_, index) => index !== replyIndex
        );
        return {
          ...comment,
          replies: updatedReplies,
        };
      }
      return comment;
    });

    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  return (
    <Container maxWidth="lg">
      <Box p={5}>
        {comments.map((comment) => (
          <Grid item xs={12} key={comment.id}>
            <Box py={2}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography variant="h6">
                    {comment.userName ? comment.userName : "*** (anonim)"}
                  </Typography>
                  <IconButton
                    onClick={() => handleComment(comment.id)}
                    size="small"
                  >
                    <ReplyIcon />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    py: "5px",
                  }}
                >
                  <Rating
                    defaultValue={comment.productRating}
                    name="half-rating-read"
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    2023 May 28
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="body1">{comment.comment}</Typography>
              </Box>

              {comment.replies &&
                comment.replies.map((reply, index) => (
                  <Box key={index} className="reply" paddingLeft="20px" pt={2}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Typography variant="body1" color="text">
                        VIP Savdo
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        2023 Iyun 1
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteReply(comment.id, index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Box pt={1}>
                      <Typography
                        variant="body2"
                        color="text"
                        textTransform="capitalize"
                      >
                        {reply}
                      </Typography>
                    </Box>
                  </Box>
                ))}

              {showReplyInput[comment.id] && (
                <Grid
                  container
                  display="flex"
                  alignItems="center"
                  gap={1}
                  className="reply"
                  mt={1}
                >
                  <Grid item>
                    <TextField
                      label="Sharhga javob berish"
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() => handleComment(comment.id, replyText)}
                      fullWidth
                    >
                      Javob qayatarish
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Box>
            <Divider variant="fullWidth" orientation="horizontal" />
          </Grid>
        ))}
      </Box>
    </Container>
  );
};

export default CommentProducts;
