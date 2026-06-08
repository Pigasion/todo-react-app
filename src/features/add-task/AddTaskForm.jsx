import Field from '@/shared/ui/Field'
import Button from '@/shared/ui/Button'
import { useContext, useState } from 'react'
import { TasksContext } from '@/entities/todo'

const AddTaskForm = (props) => {
  const { styles } = props

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const { addTask, newTaskInputRef } = useContext(TasksContext)

  const [error, setError] = useState('')

  const clearNewTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

  const onSubmit = (event) => {
    event.preventDefault()

    if (!isNewTaskTitleEmpty) {
      addTask(
        clearNewTaskTitle,
        () => setNewTaskTitle('')
      )
    }
  }

  const onInput = (event) => {
    const { value } = event.target
    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0

    setNewTaskTitle(value)
    setError(hasOnlySpaces ? 'The task cannot be empty' : '')
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Field
        className={styles.field}
        id="new-task"
        label="New task title"
        ref={newTaskInputRef}
        value={newTaskTitle}
        error={error}
        onInput={onInput}
      />
      <Button type="submit" isDisabled={isNewTaskTitleEmpty}>
        Add
      </Button>
    </form>
  )
}

export default AddTaskForm
