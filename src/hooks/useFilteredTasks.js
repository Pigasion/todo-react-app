const useFilteredTasks = () => {
  const filterTasks = (tasks, searchQuery) => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery)
        )
      : tasks
  }

  return {
    filterTasks,
  }
}

export default useFilteredTasks
