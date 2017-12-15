
import React from 'react'
import { connect } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, Grid, TextField, FormLabel, FormHelperText, Button, Chip } from 'material-ui'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import { blue } from 'material-ui/colors'
import { editTask, addTask, editAddDialog, closeAddDialog } from '../actions'

const isValidMinutes = (minutes, seconds) => ((minutes, seconds) => !isNaN(minutes) && minutes >= 0 && minutes <= 120 && (minutes < 120 || seconds === 0))(parseInt(minutes, 10), parseInt(seconds, 10))
const isValidSeconds = (minutes, seconds) => ((minutes, seconds) => !isNaN(seconds) && (minutes || seconds) && seconds >= 0 && seconds < 59)(parseInt(minutes, 10), parseInt(seconds, 10))
const getTime = (minutes, seconds) => ((minutes, seconds) => minutes * 60 + seconds)(parseInt(minutes, 10), parseInt(seconds, 10))

const mapStateToProps = state => {
  return Object.assign({}, state.dialog, {dialog: state.dialog})
}

const mapDispatchToProps = dispatch => ({
  // Sí el usuario desea guardar los cambios, se ejecuta lo siguiente:
  onDone: (dialog) => () => {
    let { id, title, description, minutes = 30, seconds = 0 } = dialog
    // If title or description is not set, then set it to empty strings and error prop will rize
    if (!title || !description) { return dispatch(editAddDialog(Object.assign({}, dialog, {title: title || '', description: description || ''}))) }
    // If the time is invalid then it won't continue
    if (!isValidMinutes(minutes, seconds) || !isValidSeconds(minutes, seconds)) { return }
    // Recast the numbers as integers
    minutes = parseInt(minutes, 10)
    seconds = parseInt(seconds, 10)

    // New or editing a task
    if (id) {
      dispatch(editTask({ id, title, description, time: minutes * 60 + seconds }))
    } else {
      dispatch(addTask({ title, description, time: minutes * 60 + seconds }))
    }
    dispatch(closeAddDialog())
  },
  // Edita algún campo de la ventana de diálogo
  onChange: (dialog, name) => (event) => {
    dispatch(editAddDialog(Object.assign({}, dialog, { [name]: event.target.value })))
  },
  // Cambia el tiempo a algún valor por defecto
  onChipClick: (dialog, minutes) => () => {
    dispatch(editAddDialog(Object.assign({}, dialog, { minutes: minutes, seconds: 0 })))
  },
  // Cierra la ventana
  onClose: () => () => dispatch(closeAddDialog())
})

// Creamos un tema especial para los Chip que recién se dieron click o el tiempo de la tarea coincide con el Chip
const chipSelected = createMuiTheme({
  palette: {
    background: {
      default: blue[300]
    }
  }
})

const AddDialog = ({ open, dialog, id, title, description, minutes = 30, seconds = 0, onChipClick, onDone, onChange, onClose, classes }) => {
  // Componente que se usa en caso de que el tiempo coincida con alguna de las opciones preesablecidas. Es la manera material-ui de modificar un componente de raíz.
  const ChipSelected = ({children}) => <MuiThemeProvider theme={chipSelected}>{children}</MuiThemeProvider>
  return <Dialog open={open} onRequestClose={onClose()}>
    <DialogContent>
      <Grid container spacing={0}>
        {/* Reúso el componente para cuando se crea o se edita una tarea */}
        <Grid item sm={3}>
          <DialogTitle>{id ? 'Editar' : 'Tarea Nueva'}</DialogTitle>
        </Grid>
        <Grid item sm={9} xs={12}>
          <form noValidate autoComplete='off'>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  id='title'
                  value={title || ''}
                  error={title === ''} // If title is not defined yet, not a problem, but if it's empty string it is bc validation.
                  onChange={onChange(dialog, 'title')}
                  label='Título'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='description'
                  value={description || ''}
                  error={description === ''}
                  onChange={onChange(dialog, 'description')}
                  label='Descripción'
                  margin='normal'
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Tiempo</FormLabel>
                <FormHelperText>Puedes seleccionar opción de abajo</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify='space-between'>
                  {[30, 45, 60].map(min => {
                    const chip = <Chip label={`${min} min`} onClick={onChipClick(dialog, min)} />
                    return <Grid key={min} item>
                      {(Number(min) * 60) === getTime(minutes, seconds) ? <ChipSelected>{chip}</ChipSelected> : chip}
                    </Grid>
                  })}
                </Grid>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  id='minutes'
                  value={minutes}
                  error={!isValidMinutes(minutes, seconds)}
                  onChange={onChange(dialog, 'minutes')}
                  type='number'
                  label='Minutos'
                  margin='normal'
                  fullWidth
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  id='seconds'
                  value={seconds}
                  error={!isValidSeconds(minutes, seconds)}
                  onChange={onChange(dialog, 'seconds')}
                  type='number'
                  label='Segundos'
                  margin='normal'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button raised color='primary' onClick={onDone(dialog)}>Listo</Button>
                <Button onClick={onClose()}>Cancelar</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDialog)
