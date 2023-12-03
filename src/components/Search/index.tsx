function Search({
  searchQuery,
  onSearch,
}: {
  searchQuery: string;
  onSearch: (query: string) => void;
}) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearch(query);
  };

  return (
    <div className='m-4'>
      <form>
        <input
          className='p-2 border rounded-md w-64 focus:outline-none focus:ring focus:border-blue-300'
          type='search'
          placeholder='Search'
          aria-label='Search'
          onChange={handleSearch}
          value={searchQuery}
        />
      </form>
    </div>
  );
}

export default Search;
