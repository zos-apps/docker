import { useState } from 'react';

interface Container {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'paused';
  ports: string;
  created: string;
}

const Docker: React.FC = () => {
  const [containers, setContainers] = useState<Container[]>([
    { id: '1', name: 'postgres-db', image: 'postgres:15', status: 'running', ports: '5432:5432', created: '2 days ago' },
    { id: '2', name: 'redis-cache', image: 'redis:alpine', status: 'running', ports: '6379:6379', created: '2 days ago' },
    { id: '3', name: 'nginx-proxy', image: 'nginx:latest', status: 'stopped', ports: '80:80', created: '1 week ago' },
  ]);
  const [activeTab, setActiveTab] = useState<'containers' | 'images' | 'volumes'>('containers');

  const toggleContainer = (id: string) => {
    setContainers(containers.map(c => 
      c.id === id 
        ? { ...c, status: c.status === 'running' ? 'stopped' : 'running' }
        : c
    ));
  };

  return (
    <div className="h-full flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-48 bg-gray-800 p-4">
        <div className="text-2xl mb-6">🐳</div>
        {(['containers', 'images', 'volumes'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left px-3 py-2 rounded mb-1 capitalize ${
              activeTab === tab ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="h-12 bg-gray-800 flex items-center justify-between px-4">
          <h1 className="text-lg font-semibold capitalize">{activeTab}</h1>
          <button className="px-4 py-1.5 bg-blue-600 rounded text-sm hover:bg-blue-700">
            + New
          </button>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          {activeTab === 'containers' && (
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-3">NAME</th>
                  <th className="pb-3">IMAGE</th>
                  <th className="pb-3">STATUS</th>
                  <th className="pb-3">PORTS</th>
                  <th className="pb-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {containers.map(container => (
                  <tr key={container.id} className="border-t border-gray-700 hover:bg-gray-800">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          container.status === 'running' ? 'bg-green-500' : 'bg-gray-500'
                        }`} />
                        {container.name}
                      </div>
                    </td>
                    <td className="py-3 text-gray-400 font-mono text-sm">{container.image}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        container.status === 'running' ? 'bg-green-900 text-green-300' : 'bg-gray-700'
                      }`}>
                        {container.status}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-sm">{container.ports}</td>
                    <td className="py-3">
                      <button 
                        onClick={() => toggleContainer(container.id)}
                        className={`px-3 py-1 rounded text-sm ${
                          container.status === 'running' 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {container.status === 'running' ? 'Stop' : 'Start'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Docker;
