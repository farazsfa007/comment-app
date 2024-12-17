import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', commentsInput: '', commentsList: []}

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(
        eachComment => eachComment.id !== commentId,
      ),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onRenderCommentList = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem key={eachComment.id} commentDetails={eachComment} />
    ))
  }

  onAddCommentInput = event => {
    event.preventDefault()
    const {nameInput, commentsInput} = this.state
    const initialBackgroundClassNames = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentsInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundClassNames,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentsInput: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentsInput: event.target.value})
  }

  render() {
    const {nameInput, commentsInput, commentsList} = this.state
    return (
      <div className="bg-container">
        <div className="container">
          <h1>Comments</h1>
          <div className="form-input-container">
            <form className="form" onSubmit={this.onAddCommentInput}>
              <p>Say something about 4.0 Technologies</p>
              <input
                onChange={this.onChangeNameInput}
                type="text"
                className="input"
                value={nameInput}
                placeholder="Your Name"
              />
              <textarea
                value={commentsInput}
                onChange={this.onChangeComment}
                placeholder="Your Comment"
                rows="7"
                className="text-area"
              />
              <button className="btn" type="submit">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="img-comment"
            />
          </div>
          <hr className="line" />
          <p className="comment">
            <span className="comment-count">{commentsList.length}</span>{' '}
            Comments
          </p>
          <ul>{this.onRenderCommentList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
