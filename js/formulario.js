$(document).ready(function() {
    // Generate a simple captcha
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    $('#captchaOperation').html([randomNumber(1, 100), '+', randomNumber(1, 200), '='].join(' '));

    $('#main-contact-form').bootstrapValidator({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'Introduce tu Nombre o Nombre de la Empresa'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'El nombre debe contener más de seis carácteres'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Introduce una dirección de Correo Electrónico'
                    },
                    emailAddress: {
                        message: 'La dirección de Correo Electrónico no es válida'
                    }
                }
            },
            phone_number: {
                validators: {
                    notEmpty: {
                        message: 'Introduce un Número de Teléfono'
                    },
                    phone: {
                            country: 'VE',
                            message: 'El Número de Teléfono no es válido'
                        }
                }
            }
        }
    }).on('success.form.bv', function(e) {
            
            e.preventDefault();
            var datos_registro = $('#main-contact-form').serialize();
            var form_status = $('<div class="form_status"></div>');
            var $form     = $(e.target),
            validator = $form.data('bootstrapValidator');

            $.ajax({
            type : 'POST',
            url: 'guardar.php',
            data : datos_registro,
            success: function(data) {
                console.log(data);
                if(data.status == 'success'){
                    $('#main-contact-form').append(form_status.html('<p class="text-success"> Gracias por preferirnos! pronto le estaremos contactando.</p>').delay(3000).fadeOut());
                    
                }else if(data.status == 'error'){
                    $('#main-contact-form').append(form_status.html('<p class="text-error"> Error servidor.</p>').delay(3000).fadeOut());
                    
                }
            }

            });
            $form.bootstrapValidator('disableSubmitButtons', false); // Enable the submit buttons
            $form.bootstrapValidator('resetForm', true);             // Reset the form
        });
});