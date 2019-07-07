module.exports = {
    main:function(title, body){
      return `
      <!doctype html>
      <html>
      <head>
        <title>${title}</title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="html/index.css">
      </head>
      <body>
        <div class='header_box'>
            <div>
                <ul>
                    <li class="head_li header_logo">
                        <img src='../img/i-rin.jpg' alt='i-rin.jpg' height="100" width="100">
                    </li>

                    <li class="right_objects head_li" >
                     <a href="/?id=sign_in">sign in</a>
                    </li>
                        
                    <li class="right_objects head_li" >
                      <a href="/?id=sign_up">sign up</a>
                    </li>
                </ul>
            </div>
        </div>
        ${body}
      </body>
      </html>
      `;
    }
  }
  