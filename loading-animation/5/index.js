function Loading(el, message){
    this.el = el
    this.childEl = document.createElement('div')
    this.childEl.className = 'typing'
    this.childEl.textContent = message
    
    this.childElStyle = {
      margin: '0 auto',
      color: 'black',
      animation: `
          typing 3s steps(${message.length}, end), 
          blink .5s step-end infinite alternate
      `,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      borderRight: '1px solid',
      fontSize: '1em',
    }
    
    Object.keys(this.childElStyle).forEach(
      key => {
        this.childEl.style[key] =   this.childElStyle[key]
      }
    )
    
    el.append(this.childEl)
    this.hide()
  }
  
  Loading.prototype.show = function(){
    this.el.style.display = 'grid'  
  }
  
  Loading.prototype.hide = function(){
    this.el.style.display = 'none'
  }
  
  const loading = new Loading(
    document.querySelector('.loading'),
    'Typing Animation Loading...'
  )
  
  // loading.hide()
  loading.show()