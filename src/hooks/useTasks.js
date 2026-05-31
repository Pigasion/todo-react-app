import { useState, useRef, useMemo, useEffect, useCallback } from 'react'
import useTasksLocalStorage from './useTasksLocalStorage'
import useFilteredTasks from './useFilteredTasks'

const useTasks = () => {
  const { savedTasks, saveTasks } = useTasksLocalStorage()

  const { filterTasks } = useFilteredTasks()

  const [tasks, setTasks] = useState(savedTasks ?? [])

  const [searchQuery, setSearchQuery] = useState('')
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const newTaskInputRef = useRef(null)

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure you want to delete all?')

    if (isConfirmed) {
      setTasks([])
    }
  }, [])

  const deleteTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter((task) => task.id !== taskId))
    },
    [tasks]
  )

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isDone }
          }

          return task
        })
      )
    },
    [tasks]
  )

  const addTask = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now.toString(),
        title: newTaskTitle,
        isDone: false,
      }

      setTasks((prevTasks) => [...prevTasks, newTask])
      setNewTaskTitle('')
      setSearchQuery('')
      newTaskInputRef.current.focus()
    }
  }, [newTaskTitle])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current?.focus()
  }, [])

  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
    console.log(`Компонент Todo отрендерился ${renderCount.current} раз(а)`)
  })

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, searchQuery)
  }, [searchQuery, tasks])

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
  }
}

export default useTasks
