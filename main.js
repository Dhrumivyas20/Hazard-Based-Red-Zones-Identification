// NARADA - Interactive Hazard Assessment & Relocation Engine

document.addEventListener('DOMContentLoaded', () => {
  // Simulator Elements
  const sliderSlope = document.getElementById('sliderSlope');
  const sliderRain = document.getElementById('sliderRain');
  const sliderDensity = document.getElementById('sliderDensity');
  const sliderSoil = document.getElementById('sliderSoil');

  const valSlope = document.getElementById('valSlope');
  const valRain = document.getElementById('valRain');
  const valDensity = document.getElementById('valDensity');
  const valSoil = document.getElementById('valSoil');

  const statusCard = document.getElementById('statusCard');
  const zonePill = document.getElementById('zonePill');
  const urgencyScore = document.getElementById('urgencyScore');
  const zoneHeading = document.getElementById('zoneHeading');
  const zoneExplanation = document.getElementById('zoneExplanation');
  const valFoS = document.getElementById('valFoS');
  const valCapLoad = document.getElementById('valCapLoad');
  const valPopRisk = document.getElementById('valPopRisk');
  const valSafeHaven = document.getElementById('valSafeHaven');

  // Modal Elements
  const btnGenEvacPlan = document.getElementById('btnGenEvacPlan');
  const evacModal = document.getElementById('evacModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const modalPlanContent = document.getElementById('modalPlanContent');
  const btnDispatchAlert = document.getElementById('btnDispatchAlert');
  const btnDownloadPlan = document.getElementById('btnDownloadPlan');

  // Header / CTA Buttons
  const btnLaunchPortal = document.getElementById('btnLaunchPortal');
  const btnExploreData = document.getElementById('btnExploreData');
  const btnCta = document.getElementById('btnCta');

 // Calculation Engine
async function calculateHazardState() {
  const slope = parseFloat(sliderSlope.value);
  const rain = parseFloat(sliderRain.value);
  const density = parseFloat(sliderDensity.value);
  const soil = parseFloat(sliderSoil.value);

  // Update input value labels immediately
  valSlope.textContent = `${slope}°`;
  valRain.textContent = `${rain} mm`;
  valDensity.textContent = `${density.toLocaleString()}`;
  valSoil.textContent = `${soil}%`;

  try {
    const response = await fetch('http://127.0.0.1:5001/api/simulate-hazard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        slope_deg: slope,
        rainfall_24h_mm: rain,
        density_pop_km2: density,
        soil_saturation_pct: soil,
        total_population: 3500
      })
    });

    const result = await response.json();

    if (!response.ok || result.status !== 'success') {
      throw new Error(result.message || 'Hazard prediction failed');
    }

    // ML pipeline response
    const hazard = result.hazard_evaluation;
    const vulnerability = result.vulnerability;
    const capacity = result.carrying_capacity;
    const relocation = result.relocation_priority;
    const sites = result.candidate_sites;

    const score = hazard.hazard_index;
    const fos = hazard.factor_of_safety;
    const tier = hazard.tier;
    const capacityLoad = capacity.capacity_load_pct;
    const affectedPop = relocation.affected_population;

    // Update UI based on ML result
    if (tier === 'RED') {

      // Critical Red Zone
      statusCard.style.background =
        'linear-gradient(135deg, #FEF2F2 0%, #FFF1F2 100%)';
      statusCard.style.borderColor = '#FECACA';

      zonePill.style.background = '#DC2626';
      zonePill.textContent = '🔴 ZONE 1: CRITICAL RED ZONE';

      urgencyScore.style.color = '#B91C1C';
      urgencyScore.textContent = `Urgency: ${score}/100`;

      zoneHeading.style.color = '#991B1B';
      zoneHeading.textContent = 'Immediate Relocation Mandate Required';

      zoneExplanation.style.color = '#7F1D1D';
      zoneExplanation.textContent =
        `ML assessment indicates ${hazard.susceptibility_level} susceptibility. ` +
        `Carrying capacity load is ${capacityLoad}%. ` +
        `Factor of Safety: ${fos}.`;

      valFoS.innerHTML =
        `${fos} <small style="color:#DC2626">(Unstable)</small>`;

      valCapLoad.className = 'm-val text-red';
      valCapLoad.textContent = `${capacityLoad}% Exceeded`;

      valPopRisk.textContent =
        `${affectedPop.toLocaleString()} Residents`;

      valSafeHaven.className = 'm-val text-green';

      if (sites && sites.length > 0) {
        valSafeHaven.textContent = sites[0].name;
      } else {
        valSafeHaven.textContent = 'No Suitable Site Available';
      }

    } else if (tier === 'ORANGE') {

      // Moderate Orange Zone
      statusCard.style.background =
        'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)';
      statusCard.style.borderColor = '#FDE68A';

      zonePill.style.background = '#D97706';
      zonePill.textContent = '🟠 ZONE 2: VULNERABLE ORANGE ZONE';

      urgencyScore.style.color = '#B45309';
      urgencyScore.textContent = `Urgency: ${score}/100`;

      zoneHeading.style.color = '#92400E';
      zoneHeading.textContent =
        'Pre-Evacuation & Capacity Stabilization';

      zoneExplanation.style.color = '#78350F';
      zoneExplanation.textContent =
        `ML assessment indicates ${hazard.susceptibility_level} susceptibility. ` +
        `Carrying capacity load is ${capacityLoad}%. ` +
        `Factor of Safety: ${fos}.`;

      valFoS.innerHTML =
        `${fos} <small style="color:#D97706">(Marginal)</small>`;

      valCapLoad.className = 'm-val text-orange';
      valCapLoad.textContent = `${capacityLoad}% Load`;

      valPopRisk.textContent =
        `${affectedPop.toLocaleString()} Residents`;

      valSafeHaven.className = 'm-val text-green';

      if (sites && sites.length > 0) {
        valSafeHaven.textContent = sites[0].name;
      } else {
        valSafeHaven.textContent = 'Monitoring Active';
      }

    } else {

      // Safe Green Zone
      statusCard.style.background =
        'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)';
      statusCard.style.borderColor = '#A7F3D0';

      zonePill.style.background = '#16A34A';
      zonePill.textContent = '🟢 ZONE 3: STABLE GREEN ZONE';

      urgencyScore.style.color = '#15803D';
      urgencyScore.textContent = `Urgency: ${score}/100`;

      zoneHeading.style.color = '#166534';
      zoneHeading.textContent =
        'Within Safe Carrying Capacity Limits';

      zoneExplanation.style.color = '#14532D';
      zoneExplanation.textContent =
        `ML assessment indicates ${hazard.susceptibility_level} susceptibility. ` +
        `Carrying capacity load is ${capacityLoad}%. ` +
        `Factor of Safety: ${fos}.`;

      valFoS.innerHTML =
        `${fos} <small style="color:#16A34A">(Stable)</small>`;

      valCapLoad.className = 'm-val text-green';
      valCapLoad.textContent = `${capacityLoad}%`;

      valPopRisk.textContent = '0 At Immediate Risk';

      valSafeHaven.className = 'm-val text-green';
      valSafeHaven.textContent = 'Habitation Secure';
    }

    // Store latest ML result for evacuation plan
    window.latestHazardResult = result;

  } catch (error) {
    console.error('Hazard prediction error:', error);

    zoneHeading.textContent = 'Unable to connect to AI prediction service';
    zoneExplanation.textContent =
      'Please make sure the Node.js and FastAPI servers are running.';

    showToast('⚠️ AI prediction service unavailable');
  }
}

// Bind Slider Events
let predictionTimeout;

[sliderSlope, sliderRain, sliderDensity, sliderSoil].forEach(slider => {
    slider.addEventListener('input', () => {
        clearTimeout(predictionTimeout);

        predictionTimeout = setTimeout(() => {
            calculateHazardState();
        }, 300);
    });
});

  // Generate Evacuation Plan Modal
  btnGenEvacPlan.addEventListener('click', () => {
    const slope = sliderSlope.value;
    const rain = sliderRain.value;
    const density = sliderDensity.value;
    const urgency = urgencyScore.textContent;
    const zone = zonePill.textContent;

    modalPlanContent.innerHTML = `
      <div style="margin-bottom: 12px;">
        <strong>Identified Classification:</strong> <span style="color:#DC2626; font-weight:700;">${zone}</span><br />
        <strong>Calculated Threat Level:</strong> ${urgency} | <strong>Rainfall Accumulation:</strong> ${rain}mm (24h)
      </div>
      <div style="border-top: 1px solid #E2E8F0; padding-top: 10px; margin-bottom: 10px;">
        <h4 style="font-size:0.95rem; margin-bottom: 6px; color:#0F172A;">Action Directives for District Administration:</h4>
        <ul style="padding-left: 18px; margin-bottom: 12px; color: #475569;">
          <li><strong>Phase 1 (Immediate - 0 to 3 Hours):</strong> Issue Level-3 Siren broadcast and automated SMS geo-fenced alert to ${valPopRisk.textContent}.</li>
          <li><strong>Phase 2 (Corridor Clearance):</strong> Open emergency transit route along <em>NH-72 Bypass (Grade Safe)</em> avoiding slope zones > 30°.</li>
          <li><strong>Phase 3 (Habitation Shelter):</strong> Deploy emergency provisions and temporary shelters at <strong>${valSafeHaven.textContent}</strong>.</li>
          <li><strong>Phase 4 (Continuous Telemetry):</strong> Maintain continuous spatial radar simulation and satellite InSAR deformation tracking.</li>
        </ul>
      </div>
      <div style="font-size: 0.8rem; background: #FFF4EE; border: 1px solid #FFEDD5; padding: 10px; border-radius: 8px; color: #C2410C;">
        🔒 Generated in compliance with National Disaster Management Authority (NDMA) Slope Fragility Standards.
      </div>
    `;

    evacModal.classList.add('open');
  });

  btnCloseModal.addEventListener('click', () => {
    evacModal.classList.remove('open');
  });

  // Close modal on outside click
  evacModal.addEventListener('click', (e) => {
    if (e.target === evacModal) {
      evacModal.classList.remove('open');
    }
  });

  // Toast notification helper
  function showToast(message) {
    const existing = document.querySelector('.toast-notice');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notice';
    toast.innerHTML = `<span>🛡️</span> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  btnDispatchAlert.addEventListener('click', () => {
    evacModal.classList.remove('open');
    showToast('🚨 Emergency Dispatch & SMS Alert Broadcasted to Vulnerable Settlements!');
  });

  btnDownloadPlan.addEventListener('click', () => {
    showToast('📥 Exporting NDMA-Compliant Relocation PDF Protocol...');
  });

  // Interactive buttons
  btnLaunchPortal.addEventListener('click', () => {
    document.getElementById('simulator').scrollIntoView({ behavior: 'smooth' });
    showToast('Interactive Carrying Capacity & Relocation Engine Loaded');
  });

  btnExploreData.addEventListener('click', () => {
    document.getElementById('simulator').scrollIntoView({ behavior: 'smooth' });
  });

  btnCta.addEventListener('click', () => {
    document.getElementById('simulator').scrollIntoView({ behavior: 'smooth' });
    showToast('✨ Welcome to NARADA - Ready to assess habitations!');
  });

  // Run initial calculation
  calculateHazardState();
});
