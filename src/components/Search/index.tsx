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
    <div>
      <form>
        <input
          className='p-1'
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
