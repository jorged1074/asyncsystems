/* ==========================================================================
   ASYNC SYSTEMS EC & DICOMFIX™ - MAIN JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileToggleBtn && mobileMenu) {
        mobileToggleBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            if (isHidden) {
                menuIcon.className = 'fa-solid fa-bars';
            } else {
                menuIcon.className = 'fa-solid fa-xmark';
            }
        });

        // Close mobile menu when clicking any nav link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.className = 'fa-solid fa-bars';
            });
        });
    }

    // 2. Product Showcase Tab Switching (dicomfix vs SIGP)
    const tabDicomfix = document.getElementById('tab-dicomfix');
    const tabSigp = document.getElementById('tab-sigp');
    const contentDicomfix = document.getElementById('content-dicomfix');
    const contentSigp = document.getElementById('content-sigp');

    if (tabDicomfix && tabSigp && contentDicomfix && contentSigp) {
        tabDicomfix.addEventListener('click', () => {
            // Activate dicomfix tab
            tabDicomfix.className = 'flex-1 py-3 px-6 text-center font-bold text-sm rounded-xl transition-all bg-[#4353ff] text-white shadow-md';
            tabSigp.className = 'flex-1 py-3 px-6 text-center font-medium text-sm rounded-xl transition-all text-gray-600 hover:text-gray-900 bg-gray-100';
            
            contentDicomfix.classList.remove('hidden');
            contentSigp.classList.add('hidden');
        });

        tabSigp.addEventListener('click', () => {
            // Activate SIGP tab
            tabSigp.className = 'flex-1 py-3 px-6 text-center font-bold text-sm rounded-xl transition-all bg-brand-primary text-white shadow-md';
            tabDicomfix.className = 'flex-1 py-3 px-6 text-center font-medium text-sm rounded-xl transition-all text-gray-600 hover:text-gray-900 bg-gray-100';
            
            contentSigp.classList.remove('hidden');
            contentDicomfix.classList.add('hidden');
        });
    }

    // 3. Simplified Clinical Calculator (3 Parameters)
    const calcForm = document.getElementById('clinical-calculator-form');
    if (calcForm) {
        const inputPatients = document.getElementById('calc-patients');
        const inputModalities = document.getElementById('calc-modalities');
        const inputBranches = document.getElementById('calc-branches');

        const resultPlanName = document.getElementById('result-plan-name');
        const resultCapacity = document.getElementById('result-capacity');
        const resultDescription = document.getElementById('result-description');
        const whatsappBtn = document.getElementById('calc-whatsapp-btn');

        function updateCalculator() {
            const patients = parseInt(inputPatients.value) || 30;
            const modalities = parseInt(inputModalities.value) || 2;
            const branches = parseInt(inputBranches.value) || 1;

            let planName = '';
            let capacityText = '';
            let descriptionText = '';
            let waMessage = '';

            // Logic for recommendation based on simple inputs
            const totalLoadFactor = (patients * modalities) * branches;

            if (branches > 2 || totalLoadFactor > 1200) {
                planName = 'Plan Institucional / Hospitalario';
                capacityText = 'Multi-sede de Alta Concurrencia • DICOM Cloud + On-Premise Backup';
                descriptionText = 'Diseñado para centros médicos grandes con múltiples sucursales. Incluye redundancia total 24/7, almacenamiento ilimitado seguro y facturación electrónica centralizada.';
            } else if (modalities >= 3 || totalLoadFactor > 400) {
                planName = 'Plan Clínico Profesional (dicomfix™ RIS/PACS)';
                capacityText = 'Hasta 5 Modalidades Médicas • Almacenamiento Seguro LOPDP';
                descriptionText = 'Ideal para centros de diagnóstico radiológico activos. Conexión DICOM 3.0 directa con equipos, visor web 3D rápido y facturación automática integrada.';
            } else {
                planName = 'Plan Esencial / Consultorio o Centro de Especialidades';
                capacityText = '1 a 2 Modalidades • Soporte Remoto & Local';
                descriptionText = 'Solución ágil y económica para centros médicos en crecimiento. Permite archivar estudios, ver imágenes en cualquier computadora y controlar caja diaria sin complicaciones.';
            }

            resultPlanName.textContent = planName;
            resultCapacity.textContent = capacityText;
            resultDescription.textContent = descriptionText;

            // Construct WhatsApp URL
            const phone = '593997213186';
            const text = `Hola Async Systems EC, deseo cotizar el *${planName}* calculado para mi centro médico (${patients} pacientes diarios, ${modalities} equipos/modalidades, ${branches} sucursal/es).`;
            whatsappBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        }

        // Listen to changes on inputs
        [inputPatients, inputModalities, inputBranches].forEach(input => {
            if (input) {
                input.addEventListener('input', updateCalculator);
                input.addEventListener('change', updateCalculator);
            }
        });

        // Initial calculation
        updateCalculator();
    }
});
