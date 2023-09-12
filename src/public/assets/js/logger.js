/**
 * @description Logger
*/

const Logger = {
	debug: (...message) => {
    console.log(`%cDEBUG` + `%c${message.join(" ")}`, Logger.genStyle('cyan'), 'font-family: "SUIT Varaible", "Pretendard Variable", sans-serif;')
	},
	info: (...message) => {
    console.log(`%cINFO` + `%c${message.join(" ")}`, Logger.genStyle('white'), 'font-family: "SUIT Varaible", "Pretendard Variable", sans-serif;')
	},
	warn: (...message) => {
    console.log(`%cWARN` + `%c${message.join(" ")}`, Logger.genStyle('yellow'), 'font-family: "SUIT Varaible", "Pretendard Variable", sans-serif;')
	},
	error: (...message) => {
    console.log(`%cERROR` + `%c${message.join(" ")}`, Logger.genStyle('red', 'white'), 'font-family: "SUIT Varaible", "Pretendard Variable", sans-serif;')
	},
  genStyle: (bg, text='black') => {
    return `color: ${text}; background: ${bg}; padding: 1px 3px; border-radius: 2px; margin-right: 5px;`
  }
}