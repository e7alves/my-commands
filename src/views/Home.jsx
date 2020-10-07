/* eslint-disable */
import React from 'react'
import htmlToFormattedText from 'html-to-formatted-text'


const copy = () => {
  // const copyText = document.getElementById('area')

  // /* Select the text field */
  // copyText.select()
  // copyText.setSelectionRange(0, 99999)

  // /* Copy the text inside the text field */
  // document.execCommand('copy')
  // alert(copyText.value)
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById('area'));
    range.select().createTextRange();
    document.execCommand("copy");
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById('area'));
    window.getSelection().addRange(range);
    document.execCommand("copy");
    alert("Text has been copied, now paste in the text-area")
  }
}



class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: [],
    }
  }

  componentDidMount() {
    console.log('did')
    chrome.storage.local.get(['firstCommand'], (result) => {
      console.log(result)
      const msg = result.firstCommand ? [htmlToFormattedText(result.firstCommand)] : []
      this.setState({
        msg,
      })
    })

    chrome.runtime.onMessage.addListener((request) => {
      if (request.eventName === 'copy-by-context-menu') {
        const { msg } = this.state
        msg.push(request.command)
        this.setState({
          msg,
        })
      }
    })
  }

  _onListChange(newList) {
    this.setState({list: newList});
  }

  render() {
    const { msg } = this.state
    return (
      <div>
        <button type="button" onClick={copy}>Copy</button>
        <span className="mdi mdi-account-group" />
        <ul>
          {msg.map(m => <pre id="area">{m}</pre>)}
        </ul>
        <select>
          <option value="">Java</option>
          <option value="">Ubuntu</option>
        </select>
      </div>
    )
  }
}

export default Home
