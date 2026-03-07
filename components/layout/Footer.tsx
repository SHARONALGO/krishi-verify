export function Footer() {
  return (
    <footer className="hidden md:block border-t border-emerald-200 bg-white mt-auto">
      <div className="container px-4 py-6 md:px-6">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h4 className="text-sm font-semibold text-emerald-800 mb-2">About KRISHI-VERIFY</h4>
            <p className="text-sm text-sage-600">
              Decentralized trust platform ensuring transparency in agricultural procurement.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-emerald-800 mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm text-forest-700">
              <li><a href="/operator" className="hover:text-emerald-600">Operator Portal</a></li>
              <li><a href="/farmer" className="hover:text-emerald-600">Farmer Dashboard</a></li>
              <li><a href="/public" className="hover:text-emerald-600">Public Data</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-emerald-800 mb-2">Technology</h4>
            <ul className="space-y-1 text-sm text-forest-700">
              <li>SHA-256 Hashing</li>
              <li>Merkle Tree Verification</li>
              <li>GitHub Integration</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-emerald-200">
          <p className="text-center text-sm text-sage-600">
            © 2026 KRISHI-VERIFY. Building trust through transparency.
          </p>
        </div>
      </div>
    </footer>
  );
}
