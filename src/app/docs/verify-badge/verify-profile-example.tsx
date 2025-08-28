import { VerifyBadge, VerifyIcon, FloatingVerifyBadge } from './verify-badge';

const VerifyProfileExample = () => {
    return (
         <div>
            <div className="max-w-sm bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
            <div className="relative">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                <img className='rounded-full' src="https://i.postimg.cc/tTbbySVY/1745219661647.jpg" alt="Developer Profile" />
                </div>
                <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Mahmud Rahman</h3>
                    <VerifyIcon type="gold" size="sm" title='Gold Verified'/>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Full-Stack JS Developer</p>
                </div>
            </div>
            <FloatingVerifyBadge 
                type="premium" 
                size="sm" 
                position="top-right"
                showLabel={false}
                title='Premium Contributor'
            />
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-600/50">
            <div className="flex gap-2">
                <VerifyBadge type="basic" size="xs" />
                <VerifyBadge type="gold" size="xs" />
                <VerifyBadge type="premium" size="xs" />
            </div>
            </div>
        </div>
    </div>
    );
};

export default VerifyProfileExample;