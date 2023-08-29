//Coded by Krishna Mavuluri
const tileDisplay=document.querySelector('.tile-container')
const keyboard =document.querySelector('.key-container')
const messageDisplay =document.querySelector('.message-container')
var GameOver=false
var currentRow=0
var currentTile=0
const guessRows = [
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','','']
]
const wordList=['mango','super','apple','dying','swing','great','river','hyped','title','honey']
var wordle=wordList[Math.floor(Math.random()*wordList.length)].toUpperCase();

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]

for(let i=0;i<guessRows.length;i++)
  {
     const rowElement=document.createElement("div")
    rowElement.setAttribute('id','guessRow-'+i)
    const guessRow=guessRows[i]
    for(let j=0;j<guessRow.length;j++)
      {
           const tileElement=document.createElement("div")
           tileElement.setAttribute('id','guessRow-'+i+'-tile-'+j)
          tileElement.classList.add('tile')
          rowElement.append(tileElement)

      }
    tileDisplay.append(rowElement)
  }

for(let i=0;i<keys.length;i++)
  {
    let buttonElement=document.createElement("button")
    buttonElement.textContent=keys[i]
    buttonElement.setAttribute("id",keys[i])
    buttonElement.addEventListener('click',() => handleClick(keys[i]))
    keyboard.append(buttonElement)
  }
const handleClick = (key) =>
  {
   // console.log("clicked")
    if(key=='ENTER') {
      checkRow()
      return 
    }
    if(key=='«') {
      deleteLetter()
      return 
    }
  addLetter(key)
   
  }
 

const addLetter = (letter) => 
  {
    if(currentRow<6 && currentTile<5)
    {

        const tile=
    document.getElementById('guessRow-'+currentRow+'-tile-'+currentTile)
        tile.textContent=letter
        tile.setAttribute("data",letter)
        guessRows[currentRow][currentTile]=letter
        currentTile++
       
  }  
}
const deleteLetter = () =>
  {
    if(currentTile>0)
    {
      currentTile--
    
   
    const tile=document.getElementById("guessRow-"+currentRow+"-tile-"+currentTile)
    tile.textContent=""
    guessRows[currentRow][currentTile]=''
              tile.setAttribute("data",'')

    
    }
  }
const checkRow = () =>
  {

     if(currentTile>4){
       fliptile()
       let guessWord=""
       for(let i=0;i<guessRows[currentRow].length;i++)
         {
           guessWord+=guessRows[currentRow][i]
         }
       
      if(guessWord==wordle)
      {
        showMessage("Magnificent !!!")
        isGameOver=true
        return
      }
      else
      {
         if(currentRow>=5)
         {
           isGameOver=false
           showMessage("Game Over !!!")
          return
         }
        else
         {
            currentRow++
            currentTile=0
         }
        
      }
     }
    
  }
const showMessage = (Message) =>
  {
    const messageElement = document.createElement('p')
    messageElement.textContent=Message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement),2000)
  }
const fliptile = () =>
  {
    const guessRow=document.querySelector('#guessRow-'+currentRow).childNodes
    for(let i=0;i<guessRow.length;i++)
      {
        const letter=guessRow[i].getAttribute('data')
        console.log(letter)
        if(letter==wordle[i])
        {
          guessRow[i].classList.add('green-overlay')
        }
        else if(wordle.includes(letter))
        {
                    guessRow[i].classList.add('yellow-overlay')
        }
        else     guessRow[i].classList.add('grey-overlay')

        
      }
  }