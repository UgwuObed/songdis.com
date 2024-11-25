const ReleaseStep = ({ uploadType, formState, setFormState }: any) => {
  return (
    <div className={`space-y-8 ${uploadType === "Single" ? "items-start" : ""}`}>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Primary Genre</label>
          <select
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formState.primaryGenre}
            onChange={(e) => setFormState({ ...formState, primaryGenre: e.target.value })}
          >
            <option value="">Select Primary Genre</option>
            <option value="Afrobeats">Afrobeats</option>
            <option value="Reggae">Reggae</option>
            <option value="Dancehall">Dancehall</option>
            <option value="Pop">Pop</option>
            <option value="Rap">Rap</option>
            <option value="R&B">R&B</option>
            <option value="Electronic">Electronic</option>
            <option value="Soul">Soul</option>
            <option value="Jazz">Jazz</option>
            <option value="Rock">Rock</option>
            <option value="Classical">Classical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Secondary Genre</label>
          <select
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formState.secondaryGenre}
            onChange={(e) =>
              setFormState({ ...formState, secondaryGenre: e.target.value })
            }
          >
            <option value="">Select Secondary Genre</option>
            <option value="Afrobeats">Afrobeats</option>
            <option value="Reggae">Reggae</option>
            <option value="Dancehall">Dancehall</option>
            <option value="Pop">Pop</option>
            <option value="Rap">Rap</option>
            <option value="R&B">R&B</option>
            <option value="Electronic">Electronic</option>
            <option value="Soul">Soul</option>
            <option value="Jazz">Jazz</option>
            <option value="Rock">Rock</option>
            <option value="Classical">Classical</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Release Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formState.releaseDate}
            onChange={(e) => setFormState({ ...formState, releaseDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Pre-Order Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formState.preorderDate}
            onChange={(e) => setFormState({ ...formState, preorderDate: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default ReleaseStep;
