// Calcium		mg/dL *	0.25 = mmol/L
// Creatinine 	mg/dL * 0.0884 = mmol/L
// Phosphorus 	mg/dL 	0.323 = mmol/L
function convert(event, obj)
{
	var textField = getTextFieldToUpdate(obj);
	var valueToConvert = textField.value;
	var conversionFactor = getConversionFactor(obj);
	var convertedValue = valueToConvert * conversionFactor;
	textField.value = convertedValue.toFixed(2);
}

function getConversionFactor(obj)
{
	var conversionFactor = NaN;
	if ((obj.id == 'unit_switch_ps') || (obj.id == 'unit_switch_pm'))
	{
		conversionFactor = 0.3230;
	}
	else if ((obj.id == 'unit_switch_cas') || (obj.id == 'unit_switch_cam'))
	{
		conversionFactor = 0.2500;
	}
	else if ((obj.id == 'unit_switch_krs') || (obj.id == 'unit_switch_krm'))
	{
		conversionFactor = 0.0884;
	}
	
	if (obj.checked) 
	{
		conversionFactor = (1 / conversionFactor);
	}
	
	return conversionFactor;
}

function getTextFieldToUpdate(obj)
{
	if (obj.id == 'unit_switch_ps')
	{
		return document.getElementById('input_ps');
	}
	else if (obj.id == 'unit_switch_cas')
	{
		return document.getElementById('input_cas');
	}
	else if (obj.id == 'unit_switch_krs')
	{
		return document.getElementById('input_krs');
	}
	else if (obj.id == 'unit_switch_pm')
	{
		return document.getElementById('input_pm');
	}
	else if (obj.id == 'unit_switch_cam')
	{
		return document.getElementById('input_cam');
	}
	else if (obj.id == 'unit_switch_krm')
	{
		return document.getElementById('input_krm');
	}
	return null;	
}

function calculate() 
{
	// Validate input data first
	if (!checkValues())
	{
		return false;
	}
	
	// Convert data if needed
	convertToCommonUnit();
	
	var ps = Number(document.getElementById('input_ps').value);
	var cas = Number(document.getElementById('input_cas').value);
	var krs = Number(document.getElementById('input_krs').value);
	var pm = Number(document.getElementById('input_pm').value);
	var cam = Number(document.getElementById('input_cam').value);
	var krm = Number(document.getElementById('input_krm').value);
	
	//TRP in %
	var trp = (1 - (pm/krm) * (krs/ps)) *  100.0;
	var trp_text = 'TRP = ' + trp.toFixed(1) + "%";
	
	var span_trp = document.getElementById('result_trp');
	if ('textContent' in span_trp) {
		span_trp.textContent = trp_text;
	} else {
		span_trp.innerText = trp_text;
	}

	// cam / krm
	var cam_krm = cam / krm / 1.0;
	var cam_krm_html = 'Ca<sub>m</sub> / Kr<sub>m</sub> = ' + cam_krm.toFixed(2);
	var span_cam_krm = document.getElementById('result_cam_krm');
	span_cam_krm.innerHTML = cam_krm_html;

    // Show result panel
	var animationName = 'animated fadeInLeft';
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	$("#form_result").css('visibility', 'visible');
	$("#form_result").addClass(animationName).one(animationEnd, function(){
		$(this).removeClass(animationName);
	});
	
	// Cancel form submission
	return false;
}

function checkValues()
{
	var result = checkValue(document.getElementById('input_ps'));
	result = checkValue(document.getElementById('input_cas')) && result;
	result = checkValue(document.getElementById('input_krs')) && result;
	result = checkValue(document.getElementById('input_pm')) && result;
	result = checkValue(document.getElementById('input_cam')) && result;
	result = checkValue(document.getElementById('input_krm')) && result;
	
	if (result == false)
	{
		var title = "Gdzie Ci si\u0119 tak \u015Bpieszy?";
		var message = "<p>Wprowad\u017A najpierw wszystkie potrzebne dane, to mo\u017Ce i co\u015B policzymy...</p>";
		var dialog = $("#dialog").dialog({
			title:title
		});
		dialog.html(message);
		dialog.dialog("option", "position", { my: "bottom", at: "top", of: "#form-submit" } );
		dialog.dialog("open");
	}
	
	return result;
}

function checkValue(obj)
{
	var BORDER_INVALID = "3px solid #ff0000";
	var BORDER_VALID = "1px solid #ff0000";

	var value = Number(obj.value);
	var minimum = getMinValue(obj);
	if (minimum == null)
	{
		// No need to validate - return true;
		obj.style.border = BORDER_VALID;
		return true;
	}
	else 
	{
		if (value <= minimum)
		{
			obj.style.border = BORDER_INVALID;
			return false;
		}
		else
		{
			obj.style.border = BORDER_VALID;
			return true;
		}
	}
}

function getMinValue(obj)
{
	// CAs doesn't require validation
	if (obj.id == "input_cas")
	{
		return null;
	}
	else 
	{
		// All other - for now - should be positive
		return 0;
	}
}

function convertToCommonUnit()
{
	convertUnitIfNeeded(document.getElementById('unit_switch_ps'));
	convertUnitIfNeeded(document.getElementById('unit_switch_cas'));
	convertUnitIfNeeded(document.getElementById('unit_switch_krs'));
	convertUnitIfNeeded(document.getElementById('unit_switch_pm'));
	convertUnitIfNeeded(document.getElementById('unit_switch_cam'));
	convertUnitIfNeeded(document.getElementById('unit_switch_krm'));
}

function convertUnitIfNeeded(obj)
{
	if (obj.checked == false)
	{
		obj.checked = true;
		convert(null, obj);
	}
}
