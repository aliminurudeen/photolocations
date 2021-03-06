import React from 'react'
import Comment from './Comment'
import { getAllComments, addComment } from '../../actions/comments'
import { connect } from 'react-redux'
import i18n from 'i18next'
import { withNamespaces } from 'react-i18next'

class Comments extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      comment: '',
      id: null,
      isHidden: true,
      error: null
    }
    this.updateComment = this.updateComment.bind(this)
    this.addNewComment = this.addNewComment.bind(this)
    this.reloadComments = this.reloadComments.bind(this)
  }

  componentDidMount () {
    this.reloadComments()
  }

  reloadComments () {
    const id = this.props.id
    this.props.getAllComments(id)
  }

  addNewComment(e){
    e.preventDefault()
    this.setState({error: null})
    let datetime = new Date()
    let date = datetime.getFullYear()+'-'+(datetime.getMonth()+1)+'-'+datetime.getDate()+' '+datetime.getHours()+':'+datetime.getMinutes()+':'+datetime.getSeconds()
    const newComment = {
      comment: this.state.comment,
      location_id: this.props.id,
      user_id: 1,
      date: date
    }
    this.props.addComment(newComment)
      .then(() => {
        this.setState({comment: ''})
      })
      .then(() => {
        this.reloadComments()
      })
      .catch(err => this.setState({error: err.message}))
  }

  updateComment(e) {
    this.setState({
      comment: document.getElementById('addNewComment').value.substr(0, 300),
      newComments: this.props.newComments
    })
  }


  render() {
    let { t, i18n } = this.props
    
    return (
      <div className='comments'>
        <h2>{t('comments.comments')}</h2>
        <form className='addCommentForm' onSubmit={this.addNewComment}>
          <textarea id='addNewComment' placeholder='Have you been here? What was your experience?' rows='4' cols='100' value={this.state.comment} onChange={this.updateComment}></textarea><br />
          <input type='submit' className='button' id='addCommentButton' value = {t('comments.add')} />
        </form>
        <ul>
          {this.props.newComments && this.props.newComments.length > 0 && 
            this.props.newComments.map(comment => {
            return <li key={comment.id}>
              <Comment comment={comment.comment} date={comment.date} user={comment.full_name} id={comment.id} onChange={this.reloadComments} />
            </li>
          })}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    newComments: state.receiveComments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllComments: (id) => {
      return dispatch(getAllComments(id))
    },
    addComment: (newComment) => {
      return dispatch(addComment(newComment))
    }
  }
}

export default withNamespaces('strings')(connect(mapStateToProps, mapDispatchToProps)(Comments))